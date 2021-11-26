package com.cholnhial.taca.service;

import com.cholnhial.taca.service.dto.MessageToneRequestDTO;
import com.cholnhial.taca.service.dto.MessageToneResponseDTO;
import com.ibm.cloud.sdk.core.security.IamAuthenticator;
import com.ibm.watson.tone_analyzer.v3.ToneAnalyzer;
import com.ibm.watson.tone_analyzer.v3.model.ToneAnalysis;
import com.ibm.watson.tone_analyzer.v3.model.ToneOptions;
import com.ibm.watson.tone_analyzer.v3.model.ToneScore;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class IBMToneAnalyzerService {

    private final ToneAnalyzer toneAnalyzer;
    private final List<String> emotionTones;

    public IBMToneAnalyzerService() {
        IamAuthenticator.Builder authBuilder = new IamAuthenticator.Builder();
        authBuilder.apikey("-86BgFUMy123MENiEBlpIDdDAvZmhaP3R9DvuelH6J0i");
        this.toneAnalyzer = new ToneAnalyzer("2017-09-21", authBuilder.build());
        toneAnalyzer.setServiceUrl("https://api.au-syd.tone-analyzer.watson.cloud.ibm.com/instances/a617e3e4-cd3a-49ef-88fa-376b9aa7392a");
        emotionTones = List.of("anger", "fear", "joy", "sadness");
    }

    public String getMessageTone(String message) {
        ToneOptions toneOptions = new ToneOptions.Builder()
                .text(message)
                .build();

        ToneAnalysis toneAnalysis = toneAnalyzer.tone(toneOptions).execute().getResult();
       return toneAnalysis.getDocumentTone().getTones().stream()
                .filter(t -> this.isEmotionalTone(t.getToneId()))
                .sorted(Comparator.comparingDouble(ToneScore::getScore).reversed())
                .map(ToneScore::getToneId)
               .findFirst().orElse("unknown");
    }

    private boolean isEmotionalTone(String tone) {
        return emotionTones.contains(tone);
    }

    public MessageToneResponseDTO processMessage(MessageToneRequestDTO request) {
        return new MessageToneResponseDTO(getMessageTone(request.getMessage()));
    }

}
